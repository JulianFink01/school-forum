package com.schoolForum.api.ressource.coaching.DTO;

import com.schoolForum.api.model.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class CoachingCreation {

    private String title;
    private String subtitle;
    private String description;
    private LocalDate date;
    private Number duration;
    private Number max_amount;
    private String url;
    private List<Topic> topics;
    private List<Image> images;
    private List<Book> books;
    private Account provider;
    private Subject subject;


}
