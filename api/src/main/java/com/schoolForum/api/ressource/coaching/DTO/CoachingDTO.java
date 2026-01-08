package com.schoolForum.api.ressource.coaching.DTO;

import com.schoolForum.api.model.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class CoachingDTO {

    private UUID id;
    private String title;
    private String subtitle;
    private String description;
    private LocalDate date;
    private Number duration;

    private Number max_amount;

    private String url;

    private Subject subject;
    private List<Topic> topics;

    private List<Image> images;

    private List<Book> books;

    private Account provider;

    private List<Account> attendees;

    private List<Rating> ratings;

    public CoachingDTO(Coaching coaching){
        this.id = coaching.getId();
        this.title = coaching.getTitle();
        this.subtitle= coaching.getSubtitle();
        this.description=coaching.getDescription();
        this.date=coaching.getDate();
        this.duration=coaching.getDuration();
        this.max_amount=coaching.getMax_amount();
        this.url=coaching.getUrl();
        this.topics=coaching.getTopics();
        this.images=coaching.getImages();
        this.books=coaching.getBooks();
        this.provider=coaching.getProvider();
        this.subject = coaching.getSubject();
        this.attendees = coaching.getAttendees();
        this.ratings=coaching.getRatings();

    }
}
