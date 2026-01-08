package com.schoolForum.api.ressource.account;

import com.schoolForum.api.model.*;
import com.schoolForum.api.repository.AccountRepository;

import com.schoolForum.api.repository.BookRepository;
import com.schoolForum.api.repository.CoachingRepository;
import com.schoolForum.api.repository.PostRepository;
import com.schoolForum.api.ressource.account.DTO.AccountCreation;
import com.schoolForum.api.ressource.account.DTO.AccountUpdate;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.security.Authenticated;
import lombok.extern.java.Log;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.json.bind.annotation.JsonbTransient;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.UUID;

@Tag(name = "Account resource")
@Path("accounts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
@Log
@Authenticated
public class AccountResource {

    @Inject
    AccountRepository accountRepository;
    @Inject
    CoachingRepository coachingRepository;
    @Inject
    BookRepository bookRepository;
    @Inject
    PostRepository postRepository;


    @GET
    @Path("{id}")
    public Account getAccountById(@PathParam("id") @NotNull UUID id) {
        return accountRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));
    }

    @GET
    @Path("{id}/books")
    public List<Book> getBooksByAccount(@PathParam("id") @NotNull UUID id) {
        Account account = accountRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));
        return bookRepository.findBookByAccount(account).list();
    }

    @GET
    @Path("{id}/posts")
    public List<Post> getPostsByAccount(@PathParam("id") @NotNull UUID id) {
        Account account = accountRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));
        return postRepository.findPostByAccount(account).list();
    }

    @GET
    @Path("{id}/coachings")
    public List<Coaching> getCoachingByAccount(@PathParam("id") @NotNull UUID id) {
        Account account = accountRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));
        return coachingRepository.findCoachingByAccount(account).list();
    }

    @JsonbTransient
    @Path("{id}/profilePicture")
    @POST
    public Image setProfileImage(@PathParam("id") UUID id, Image image) {
        Account account = accountRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));
        image.persist();
        account.setProfilePicture(image);
        account.persist();
        return image;
    }
    @JsonbTransient
    @Path("{id}/thumbnail")
    @POST
    public Image setThumbnail(@PathParam("id") UUID id, Image image) {
        Account account = accountRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));
        image.persist();
        account.setThumbnail(image);
        account.persist();
        return image;
    }

    @GET
    @Transactional
    public List<Account> listAccounts(@QueryParam("email") String email) {
        if(email != null && email != ""){
            return accountRepository.findByEmail(email).list();
        }
        return accountRepository.findAll().list();
    }

    @POST
    @Transactional
    public Response addAccount(AccountCreation accountCreation) {
        Account account = new Account(accountCreation);
        account.persist();
        return Response.ok(account).status(201).build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    public Response updateAccount(@PathParam("id") UUID id, AccountUpdate accountUpdate) {
        Account account = accountRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));
        account.update(accountUpdate);
        return Response.ok(account).status(201).build();
    }


}
