using AutoMapper;
using Crash.BookStoreSPA.Books;
using Crash.BookStoreSPA.Organization;

namespace Crash.BookStoreSPA
{
    public class BookStoreSPAApplicationAutoMapperProfile : Profile
    {
        public BookStoreSPAApplicationAutoMapperProfile()
        {

            CreateMap<Book, BookDto>();
            CreateMap<CreateUpdateBookDto, Book>();

            //组织单元配置
            CreateMap<OrganizationUnit, OrganizationUnitDto>();
        }
    }
}