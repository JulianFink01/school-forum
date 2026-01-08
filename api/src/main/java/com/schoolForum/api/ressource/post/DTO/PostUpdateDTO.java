package com.schoolForum.api.ressource.post.DTO;

import com.schoolForum.api.model.*;
import com.schoolForum.api.ressource.image.DTO.ImageDTO;
import com.schoolForum.api.ressource.topic.DTO.TopicDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class PostUpdateDTO {
    private UUID id;
    private String title;
    private String message;
    private List<TopicDTO> topics;
    private List<ImageDTO> images;
}
