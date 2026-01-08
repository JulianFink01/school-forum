package com.schoolForum.api.ressource.book;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Book;
import com.schoolForum.api.model.Image;
import com.schoolForum.api.model.Post;
import com.schoolForum.api.repository.AccountRepository;
import com.schoolForum.api.repository.BookRepository;
import com.schoolForum.api.repository.PostRepository;
import com.schoolForum.api.ressource.account.DTO.AccountCreation;
import com.schoolForum.api.ressource.account.DTO.AccountUpdate;
import com.schoolForum.api.ressource.book.DTO.BookCreation;
import io.quarkus.security.Authenticated;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.json.bind.annotation.JsonbTransient;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Tag(name = "Book resource")
@Path("books")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
@Authenticated
public class BookResource {

    @Inject
    BookRepository bookRepository;
    @Inject
    AccountRepository accountRepository;

    @GET
    @JsonbTransient
    public List<Book> list(@QueryParam("filter") String filter, @QueryParam("accountId") UUID accountId, @QueryParam("page") String pageString, @QueryParam("size") String sizeString) {
        Integer page = 0;
        Integer size = 30;
        if (pageString != null) {
            page = Integer.parseInt(pageString);
        }
        if (sizeString != null) {
            size = Integer.parseInt(sizeString);
        }


        if (filter != null && filter != "" && accountId != null) {
            Account account = accountRepository.findByIdOptional(accountId)
                    .orElseThrow(() -> new NotFoundException("User '" + accountId + "' not found."));
            List<Book> books = bookRepository.findByFilterAndAccountId(filter, account).page(page, size).list();
            books.sort(Comparator.comparing(Book::getTimestamp));
            return books;
        } else if (filter != null && filter != "") {
            List<Book> books = bookRepository.findByFilter(filter).page(page, size).list();

            books.sort(Comparator.comparing(Book::getTimestamp));
            return books;

        } else if (accountId != null) {

            Account account = accountRepository.findByIdOptional(accountId)
                    .orElseThrow(() -> new NotFoundException("User '" + accountId + "' not found."));

            List<Book> books = bookRepository.findBookByAccount(account).page(page, size).list();
            books.sort(Comparator.comparing(Book::getTimestamp));
            return books;

        } else {
            List<Book> books = bookRepository.listAll();
            books.sort(Comparator.comparing(Book::getTimestamp));
            return books;
        }
    }

    @POST
    @Transactional
    public Response addBook(BookCreation bookCreation) {
        Book book = new Book(bookCreation);
        book.persist();
        return Response.ok(book).status(201).build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    public Response updateAccount(@PathParam("id") UUID id, BookCreation bookCreation) {
       Book book = bookRepository.findByIdOptional(id)
               .orElseThrow(() -> new NotFoundException("Book '" + id + "' not found."));
       book.update(bookCreation);
        return Response.ok(book).status(201).build();
    }
    @GET
    @JsonbTransient
    @Path("{id}/images")
    public List<Image> getImages(@PathParam("id") UUID id) {
        Book book = bookRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Book '" + id + "' not found."));
        List<Image> books = book.getImages();
        return books;
    }

    @POST
    @JsonbTransient
    @Path("{id}/images")
    public Image addImage(@PathParam("id") UUID id, Image image) {
        Book book = bookRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Book '" + id + "' not found."));
        image.persist();
        book.getImages().add(image);
        book.persist();
        return image;
    }
}
