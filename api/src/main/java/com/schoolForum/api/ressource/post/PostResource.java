package com.schoolForum.api.ressource.post;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Image;
import com.schoolForum.api.model.Post;
import com.schoolForum.api.repository.AccountRepository;
import com.schoolForum.api.repository.ImageRepository;
import com.schoolForum.api.repository.PostRepository;
import com.schoolForum.api.ressource.post.DTO.PostDTO;
import com.schoolForum.api.ressource.post.DTO.PostUpdateDTO;
import io.quarkus.security.Authenticated;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.json.bind.annotation.JsonbTransient;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.*;

@Tag(name = "Post resource")
@Path("posts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
@Authenticated
public class PostResource {

    @Inject
    PostRepository postRepository;
    @Inject
    AccountRepository accountRepository;
    @Inject
    ImageRepository imageRepository;

    @GET
    @JsonbTransient
    public List<Post> list(@QueryParam("filter") String filter, @QueryParam("accountId") UUID accountId, @QueryParam("page") String pageString, @QueryParam("size") String sizeString) {
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
            List<Post> posts = postRepository.findByFilterAndAccountId(filter, account).page(page, size).list();
            posts.sort(Comparator.comparing(Post::getTimestamp));
            return posts;
        } else if (filter != null && filter != "") {
            List<Post> posts = postRepository.findByFilter(filter).page(page, size).list();

            posts.sort(Comparator.comparing(Post::getTimestamp));
            return posts;

        } else if (accountId != null) {

            Account account = accountRepository.findByIdOptional(accountId)
                    .orElseThrow(() -> new NotFoundException("User '" + accountId + "' not found."));

            List<Post> posts = postRepository.findPostByAccount(account).page(page, size).list();
            posts.sort(Comparator.comparing(Post::getTimestamp));
            return posts;

        } else {
            List<Post> posts = postRepository.listAll();
            posts.sort(Comparator.comparing(Post::getTimestamp));
            return posts;
        }
    }


    @POST
    @JsonbTransient
    public Post addPost(Post post) {
        post.persist();
        return post;
    }
    @POST
    @JsonbTransient
    @Path("{id}/images")
    public Image addImage(@PathParam("id") UUID id, Image image) {
        Post post = postRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Post '" + id + "' not found."));
        image.persist();
        post.getImages().add(image);
        post.persist();
        return image;
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Post updatePost(@PathParam("id") UUID id, PostUpdateDTO postUpdateDTO) {
        Post post = postRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Post '" + id + "' not found."));
        post.update(postUpdateDTO);
        return post;
    }

    @GET
    @JsonbTransient
    @Path("{id}/comments")
    public List<Post> getComments(@PathParam("id") UUID id) {

        Post post = postRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Post '" + id + "' not found."));

        List<Post> posts = post.getComments();
        posts.sort(Comparator.comparing(Post::getTimestamp));
        return posts;
    }

    @GET
    @JsonbTransient
    @Path("{id}/images")
    public List<Image> getImages(@PathParam("id") UUID id) {
        Post post = postRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Image '" + id + "' not found."));
        List<Image> images = post.getImages();
        return images;
    }


    @POST
    @JsonbTransient
    @Path("{id}/comments")
    @Transactional
    public Post addComment(@PathParam("id") UUID id, Post comment) {

        Post post = postRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Post '" + id + "' not found."));
        comment.setComment(true);
        comment.persist();
        post.getComments().add(comment);
        post.persist();
        return post;
    }

    @DELETE
    @JsonbTransient
    @Path("{id}/comments/{commentId}")
    @Transactional
    public Post deleteComment(@PathParam("id") UUID id, @PathParam("commentId") UUID commentId) {

        Post post = postRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Post '" + id + "' not found."));
        Post comment = postRepository.findByIdOptional(commentId)
                .orElseThrow(() -> new NotFoundException("Comment '" + id + "' not found."));
        post.getComments().remove(comment);
        post.persist();
        return post;
    }

    @DELETE
    @JsonbTransient
    @Path("{id}")
    @Transactional
    public Post delete(@PathParam("id") UUID id) {

        Post post = postRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Post '" + id + "' not found."));
        post.setComments(null);
        post.setImages(null);
        post.setProvider(null);
        post.delete();
        return post;
    }

}
