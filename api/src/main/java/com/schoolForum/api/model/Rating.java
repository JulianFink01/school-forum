package com.schoolForum.api.model;

import com.schoolForum.api.ressource.rating.DTO.RatingDTO;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity(name = "rating")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Transactional
public class Rating extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(name = "rating")
    private Number rating;

    public Rating(RatingDTO rating){
        this.rating=rating.getRating();
        this.account=rating.getAccount();
    }

}
