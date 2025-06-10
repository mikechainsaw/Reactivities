using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest<Result<Activity>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Activity>>
    {

        public async Task<Result<Activity>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.ActivityDto.Id], cancellationToken);

            if (activity == null) return Result<Activity>.Failure("Activity Not Found", 404);


            mapper.Map(request.ActivityDto, activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Activity>.Failure("Failed to update activity", 400);

            return Result<Activity>.Success(activity);
        }

    }
}
