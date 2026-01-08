package com.schoolForum.api.model;

import com.fasterxml.jackson.jaxrs.json.annotation.JSONP;
import com.schoolForum.api.ressource.coaching.DTO.CoachingCreation;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity(name = "coaching")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Transactional
public class Coaching extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "subtitle")
    private String subtitle;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "date")
    private LocalDate date;

    @NotNull
    @Column(name = "duration")
    private Number duration;

    @Column(name = "max_amount")
    private Number max_amount;

    @Column(name = "url")
    private String url;

    @ManyToOne(
            cascade = {
                    CascadeType.MERGE,
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private Subject subject;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Topic> topics;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = {
            CascadeType.MERGE,
    })
    private List<Image> images;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Book> books;

    @ManyToOne(
            cascade = {
                    CascadeType.MERGE,
            },
            fetch = FetchType.EAGER)
    @JoinColumn(name = "provider_id")
    private Account provider;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Account> attendees;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(
            cascade = {
                    CascadeType.MERGE,
            })
    private List<Rating> ratings;

    public Coaching(CoachingCreation coachingCreation) {
        this.title = coachingCreation.getTitle();
        this.subtitle = coachingCreation.getSubtitle();
        this.description = coachingCreation.getDescription();
        this.date = coachingCreation.getDate();
        this.duration = coachingCreation.getDuration();
        this.max_amount = coachingCreation.getMax_amount();
        this.url = coachingCreation.getUrl();
        this.topics = coachingCreation.getTopics();
        this.images = coachingCreation.getImages();
        this.books = coachingCreation.getBooks();
        this.provider = coachingCreation.getProvider();
        this.subject = coachingCreation.getSubject();
    }

    public void update(CoachingCreation coachingCreation){
        if(coachingCreation.getTitle()!=null)
        this.title = coachingCreation.getTitle();
        if(coachingCreation.getSubtitle()!=null)
        this.subtitle = coachingCreation.getSubtitle();
        if(coachingCreation.getDescription()!=null)
        this.description = coachingCreation.getDescription();
        if(coachingCreation.getDate()!=null)
        this.date = coachingCreation.getDate();
        if(coachingCreation.getDuration()!=null)
        this.duration = coachingCreation.getDuration();
        if(coachingCreation.getMax_amount()!=null)
        this.max_amount = coachingCreation.getMax_amount();
        if(coachingCreation.getUrl()!=null)
        this.url = coachingCreation.getUrl();
        if(coachingCreation.getTopics()!=null)
        this.topics = coachingCreation.getTopics();
        if(coachingCreation.getImages()!=null)
        this.images = coachingCreation.getImages();
        if(coachingCreation.getBooks()!=null)
        this.books = coachingCreation.getBooks();
        if(coachingCreation.getProvider()!=null)
        this.provider = coachingCreation.getProvider();
        if(coachingCreation.getSubject()!=null)
        this.subject = coachingCreation.getSubject();

    }
}
