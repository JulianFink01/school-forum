package com.schoolForum.api.repository;

import com.schoolForum.api.model.Rating;
import com.schoolForum.api.model.Subject;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import java.util.UUID;

@ApplicationScoped
public class SubjectRepository implements PanacheRepositoryBase<Subject, UUID> {


}
