package com.schoolForum.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.schoolForum.api.ressource.image.DTO.ImageDTO;
import com.schoolForum.api.ressource.post.DTO.PostUpdateDTO;
import com.schoolForum.api.ressource.topic.DTO.TopicDTO;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.java.Log;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import javax.ws.rs.DefaultValue;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity(name = "post")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Transactional
@Log
public class Post extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    private String title;

    @NotNull
    private String message;

    @CreationTimestamp
    private LocalDate timestamp;

    @ManyToOne(
            cascade = {
                    CascadeType.MERGE
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private Account provider;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonbTransient
    private List<Image> images;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Topic> topics;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Post> comments;

    private boolean isComment;


    public void update(PostUpdateDTO postUpdateDTO) {
        this.images.clear();
        this.topics.clear();
        this.id = postUpdateDTO.getId();
        this.title = postUpdateDTO.getTitle();
        this.message = postUpdateDTO.getMessage();
        for (TopicDTO topic : postUpdateDTO.getTopics()) {
            Topic newTopic = new Topic(topic);
            newTopic.persistAndFlush();
            this.topics.add(newTopic);
        }
        for (ImageDTO image : postUpdateDTO.getImages()) {
            Image newImage = new Image(image);
            newImage.persistAndFlush();
            this.images.add(newImage);
        }
        this.timestamp = LocalDate.now();
    }

}
