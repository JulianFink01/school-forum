package com.schoolForum.api.repository;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Book;
import com.schoolForum.api.model.Coaching;
import com.schoolForum.api.model.Post;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.panache.common.Parameters;

import javax.enterprise.context.ApplicationScoped;
import java.util.UUID;

@ApplicationScoped
public class CoachingRepository implements PanacheRepositoryBase<Coaching, UUID> {

    public PanacheQuery<Coaching> findCoachingByAccount(Account account) {
        return find("select c from coaching c where c.provider = :account",
                Parameters.with("account", account));
    }

}
