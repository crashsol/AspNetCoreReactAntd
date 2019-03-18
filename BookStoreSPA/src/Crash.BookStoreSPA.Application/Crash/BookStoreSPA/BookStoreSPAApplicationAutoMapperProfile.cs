using AutoMapper;
using Crash.BookStoreSPA.Books;

namespace Crash.BookStoreSPA
{
    public class BookStoreSPAApplicationAutoMapperProfile : Profile
    {
        public BookStoreSPAApplicationAutoMapperProfile()
        {

            CreateMap<Book, BookDto>();
            CreateMap<CreateUpdateBookDto, Book>();
        }
    }
}