package com.schoolForum.api.model;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.schoolForum.api.ressource.account.DTO.AccountCreation;
import com.schoolForum.api.ressource.account.DTO.AccountUpdate;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;

@Entity(name = "account")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Transactional
@Log
public class Account extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    @Column(name = "first_name")
    private String firstName;

    @NotNull
    @Column(name = "last_name")
    private String lastName;

    @NotNull
    private String email;

    @Column(name = "birth_day")
    private LocalDate birthDay;

    private String biography;

    @OneToOne(
            cascade = {
                    CascadeType.MERGE,
            },
            fetch = FetchType.EAGER)
    @JoinColumn(name = "thumbnail_id")
    private Image thumbnail;

    @OneToOne(
            cascade = {
                    CascadeType.MERGE,
            },
            fetch = FetchType.EAGER)
    @JoinColumn(name = "profilepicture_id")
    private Image profilePicture;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Language> languages;

    @Column(name = "accepted_privacy_policy")
    private Boolean hasAcceptedPrivacyPolicy = false;

    @Column(name = "accepted_terms_and_condtions")
    private Boolean hasAcceptedTermsAndConditions = false;


    public Account(AccountCreation accountCreation) {
        this.firstName = accountCreation.getFirstName();
        this.lastName = accountCreation.getLastName();
        this.email = accountCreation.getEmail();
        this.birthDay = accountCreation.getBirthDay();
        this.profilePicture = accountCreation.getProfilePicture();
        this.profilePicture.persist();
        this.thumbnail = accountCreation.getThumbnail();
        this.thumbnail.persist();
    }

    public void update(AccountUpdate accountUpdate) {
        if (accountUpdate.getFirstName() != null)
            this.firstName = accountUpdate.getFirstName();
        if (accountUpdate.getLastName() != null)
            this.lastName = accountUpdate.getLastName();
        if (accountUpdate.getEmail() != null)
            this.email = accountUpdate.getEmail();
        if (accountUpdate.getBirthDay() != null)
            this.birthDay = accountUpdate.getBirthDay();
        if (accountUpdate.getLanguages() != null)
            this.languages = accountUpdate.getLanguages();
        if (accountUpdate.getProfilePicture() != null) {
            this.profilePicture = new Image(accountUpdate.getProfilePicture());
            this.profilePicture.persist();
        }
        if(accountUpdate.getBiography() != null){
            this.biography = accountUpdate.getBiography();
        }
        if (accountUpdate.getThumbnail() != null) {
            this.thumbnail = new Image(accountUpdate.getThumbnail());
            this.thumbnail.persist();
        }
    }

}
