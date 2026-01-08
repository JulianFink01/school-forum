package com.schoolForum.api.repository;

import com.schoolForum.api.model.Coaching;
import com.schoolForum.api.model.Image;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import java.util.UUID;

@ApplicationScoped
public class ImageRepository implements PanacheRepositoryBase<Image, UUID> {


}
