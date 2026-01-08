package com.schoolForum.api.ressource.coaching;

import com.schoolForum.api.model.*;
import com.schoolForum.api.repository.AccountRepository;
import com.schoolForum.api.repository.CoachingRepository;
import com.schoolForum.api.ressource.coaching.DTO.CoachingCreation;
import com.schoolForum.api.ressource.image.DTO.ImageDTO;
import com.schoolForum.api.ressource.rating.DTO.RatingDTO;
import io.quarkus.security.Authenticated;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.json.bind.annotation.JsonbTransient;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.UUID;

@Tag(name = "Coaching resource")
@Path("coachings")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
@Authenticated
public class CoachingResource {

    @Inject
    CoachingRepository coachingRepository;
    @Inject
    AccountRepository accountRepository;

    @GET
    @Transactional
    public List<Coaching> list() {
        return coachingRepository.listAll();
    }

    @POST
    @Transactional
    public Response addCoaching(CoachingCreation coachingCreation) {
        Coaching coaching = new Coaching(coachingCreation);
        coaching.persist();
        return Response.ok(coaching).status(201).build();
    }

    @POST
    @Transactional
    @JsonbTransient
    @Path("{id}/ratings")
    public Response addRating(@PathParam("id") UUID id, RatingDTO raiting) {
        Coaching coaching = coachingRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Coaching '" + id + "' not found."));
        Rating newRating = new Rating(raiting);
        newRating.persist();
        coaching.getRatings().add(newRating);
        coaching.persist();
        return Response.ok(coaching).status(201).build();
    }

    @POST
    @Transactional
    @JsonbTransient
    @Path("{id}/images")
    public Response addImage(@PathParam("id") UUID id, ImageDTO image) {
        Coaching coaching = coachingRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Coaching '" + id + "' not found."));
        Image newImage = new Image(image);
        newImage.persist();
        coaching.getImages().add(newImage);
        coaching.persist();
        return Response.ok(coaching).status(201).build();
    }

    @POST
    @Transactional
    @JsonbTransient
    @Path("{id}/attendees/{accountId}")
    public Response addAttendee(@PathParam("id") UUID id, @PathParam("accountId") UUID accountId) {
        Coaching coaching = coachingRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Coaching '" + id + "' not found."));

        Account account = accountRepository.findByIdOptional(accountId)
                .orElseThrow(() -> new NotFoundException("User '" + id + "' not found."));

        coaching.getAttendees().add(account);
        coaching.persist();
        return Response.ok(coaching).status(201).build();
    }


    @GET
    @Transactional
    @Path("{id}")
    public Coaching getCoaching(@PathParam("id") UUID id) {
        Coaching coaching = coachingRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Coaching '" + id + "' not found."));
        return coaching;
    }

    @PUT
    @Transactional
    @Path("{id}")
    public Response updateCoaching(@PathParam("id") UUID id, CoachingCreation coachingUpdate) {
        Coaching coaching = coachingRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Coaching '" + id + "' not found."));
        coaching.update(coachingUpdate);
        return Response.ok(coachingUpdate).status(201).build();
    }
}
