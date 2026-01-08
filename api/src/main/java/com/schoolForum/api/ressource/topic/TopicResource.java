package com.schoolForum.api.ressource.topic;

import com.schoolForum.api.model.Subject;
import com.schoolForum.api.model.Topic;
import com.schoolForum.api.repository.SubjectRepository;
import com.schoolForum.api.repository.TopicRepository;
import com.schoolForum.api.ressource.topic.DTO.TopicDTO;
import io.quarkus.security.Authenticated;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Tag(name = "Topic resource")
@Path("topics")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
@Authenticated
public class TopicResource {

    @Inject
    TopicRepository topicRepository;

    @GET
    public List<Topic> list() {
        return topicRepository.listAll();
    }

    @POST
    public Response addTopic(TopicDTO topicDTO){
            Topic topic = new Topic(topicDTO);
            topic.persist();
            return Response.ok(topic).build();
    }

}
