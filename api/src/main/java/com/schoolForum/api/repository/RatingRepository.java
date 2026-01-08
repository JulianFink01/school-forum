package com.schoolForum.api.repository;

import com.schoolForum.api.model.Language;
import com.schoolForum.api.model.Rating;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import java.util.UUID;

@ApplicationScoped
public class RatingRepository implements PanacheRepositoryBase<Rating, UUID> {


}
