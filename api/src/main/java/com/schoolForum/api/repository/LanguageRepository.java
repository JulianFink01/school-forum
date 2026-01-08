package com.schoolForum.api.repository;

import com.schoolForum.api.model.Image;
import com.schoolForum.api.model.Language;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import java.util.UUID;

@ApplicationScoped
public class LanguageRepository implements PanacheRepositoryBase<Language, UUID> {


}
