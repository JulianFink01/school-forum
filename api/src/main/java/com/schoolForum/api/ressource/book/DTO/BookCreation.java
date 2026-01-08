package com.schoolForum.api.ressource.book.DTO;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Image;
import com.schoolForum.api.model.Topic;
import com.schoolForum.api.ressource.topic.DTO.TopicDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.ws.rs.DefaultValue;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class BookCreation {
    private String isbn;
    private String name;
    private String author;
    private String description;
    private Number price;
    private String status;
    private Account seller;
    private List<Topic> topics;
    private List<Image> images;
    private boolean isSold;
}
