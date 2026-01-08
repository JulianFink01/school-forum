package com.schoolForum.api.repository;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Book;
import com.schoolForum.api.model.Post;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;
import lombok.extern.java.Log;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.UUID;

@ApplicationScoped
@Log
public class BookRepository implements PanacheRepositoryBase<Book, UUID> {


    public PanacheQuery<Book> findBookByAccount(Account account) {
        log.info("Account "+account.getEmail());
        return find("select b from book b where b.seller = :account",
                Parameters.with("account", account));
    }

    public PanacheQuery<Book> findByFilter(String filter) {
        return find("select b from book b " +
                        "where lower(b.name) like lower(concat('%', :filter, '%'))",
                Sort.by("b.timestamp", Sort.Direction.Descending),
                Parameters.with("filter", filter));
    }

    public PanacheQuery<Book> findByFilterAndAccountId(String filter, Account account) {
        return find("select b " +
                        "from book b " +
                        "where b.seller = :account " +
                        "and lower(b.name) like lower(concat('%', :filter, '%')) ",
                Sort.by("p.timestamp", Sort.Direction.Descending),
                Parameters.with("filter", filter).and("account", account));
    }

}
