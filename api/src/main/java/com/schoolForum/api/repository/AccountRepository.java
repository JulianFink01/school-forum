package com.schoolForum.api.repository;

import com.schoolForum.api.model.Account;
import com.schoolForum.api.model.Coaching;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.panache.common.Parameters;
import org.jboss.resteasy.annotations.Query;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class AccountRepository implements PanacheRepositoryBase<Account, UUID> {


    @Transactional
    public void add(Account account) {
        account.persist();
    }

    public PanacheQuery<Account> findByEmail(String email) {
        return find("select a " +
                        "from account a " +
                        "where a.email=:email",
                Parameters.with("email", email));
    }

}
