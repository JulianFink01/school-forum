package com.schoolForum.api.model;

import com.schoolForum.api.ressource.topic.DTO.TopicDTO;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity(name = "topic")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Transactional
public class Topic extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    @Column(name = "name")
    private String name;

    public Topic(TopicDTO topicDTO){
        this.name=topicDTO.getName();
    }

}
