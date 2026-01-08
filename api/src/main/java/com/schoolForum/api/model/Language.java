package com.schoolForum.api.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "language")
@Data
@NoArgsConstructor
public class Language extends PanacheEntityBase {

    @Id
    private Integer id;

    private String name;

    private String abbreviation;
}
