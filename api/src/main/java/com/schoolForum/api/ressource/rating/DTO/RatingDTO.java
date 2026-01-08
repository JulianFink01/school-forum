package com.schoolForum.api.ressource.rating.DTO;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Image;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RatingDTO {
private Account account;
private Number rating;
}
