using Application.Activities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<Activity, CreateActivityDto>().ReverseMap();
        CreateMap<Activity, EditActivityDto>().ReverseMap();
    }
}
