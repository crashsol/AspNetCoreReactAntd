﻿using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Crash.BookStoreSPA.Books
{
    /// <summary>
    /// 定义书籍服务管理类
    /// </summary>
    public interface IBookAppService :
          IAsyncCrudAppService< //定义了CRUD方法
              BookDto, //用来展示书籍
              Guid, //Book实体的主键
              PageAndStortedAndFilterRequestDto, //获取书籍的时候用于分页和排序和过滤
              CreateUpdateBookDto, //用于创建书籍
              CreateUpdateBookDto> //用户更新书籍
    {

    }
}
