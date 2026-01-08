package com.schoolForum.api.ressource.post.DTO;

import com.schoolForum.api.model.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class PostDTO {
    private UUID id;
    private String title;
    private String message;
    private Account provider;
    private List<Topic> topics;
    private List<Image> images;
    private Post[] comments;
    private Rating ratings;
    private String timestamp;
}
