package com.schoolForum.api.repository;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Book;
import com.schoolForum.api.model.Post;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.UUID;

@ApplicationScoped
public class PostRepository implements PanacheRepositoryBase<Post, UUID> {

    public PanacheQuery<Post> findPostByAccount(Account account) {
        return find("select p from post p where p.provider = :account " +
                        "and p.isComment = false",
                Sort.by("p.timestamp", Sort.Direction.Descending),
                Parameters.with("account", account));
    }

    public PanacheQuery<Post> findByFilter(String filter) {
        return find("select p from post p " +
                        "where lower(p.title) like lower(concat('%', :filter, '%'))" +
                        "and p.isComment = false",
                Sort.by("p.timestamp", Sort.Direction.Descending),
                Parameters.with("filter", filter));
    }

    public PanacheQuery<Post> findByFilterAndAccountId(String filter, Account account) {
        return find("select p " +
                        "from post p " +
                        "where p.provider = :account " +
                        "and lower(p.title) like lower(concat('%', :filter, '%')) " +
                        "and p.isComment = false",
                Sort.by("p.timestamp", Sort.Direction.Descending),
                Parameters.with("filter", filter).and("account", account));
    }

}
