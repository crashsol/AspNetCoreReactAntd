using AutoMapper;
using Crash.BookStoreSPA.Books;
using Crash.BookStoreSPA.Organization;
using Volo.Abp.AutoMapper;

namespace Crash.BookStoreSPA
{
    public class BookStoreSPAApplicationAutoMapperProfile : Profile
    {
        public BookStoreSPAApplicationAutoMapperProfile()
        {

            CreateMap<Book, BookDto>();
            CreateMap<CreateUpdateBookDto, Book>();

            //组织单元配置
            CreateMap<OrganizationUnit, OrganizationUnitDto>()
                .ForMember(d=>d.Key,opt=>opt.MapFrom(src=>src.Id));

        }
    }
}