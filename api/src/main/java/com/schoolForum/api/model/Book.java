package com.schoolForum.api.model;

import com.schoolForum.api.ressource.book.DTO.BookCreation;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity(name = "book")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Transactional
public class Book extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    @Column(name = "isbn")
    private String isbn;

    @CreationTimestamp
    private LocalDate timestamp;

    @Column(name = "name")
    private String name;

    @Column(name = "author")
    private String author;

    @ManyToMany(
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Topic> topics;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Number price;

    @Column(name = "status")
    private String status;

    @Column(name = "sold")
    private boolean sold;

    @ManyToOne(
            cascade = {
                    CascadeType.MERGE
            })
    @LazyCollection(LazyCollectionOption.FALSE)
    private Account seller;

    @ManyToMany(
            cascade = {
                    CascadeType.ALL,
            },
            fetch = FetchType.EAGER)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonbTransient
    private List<Image> images;

    public Book(BookCreation bookCreation) {

        this.isbn = bookCreation.getIsbn();
        this.name = bookCreation.getName();
        this.author = bookCreation.getAuthor();
        this.description = bookCreation.getDescription();
        this.price = bookCreation.getPrice();
        this.status = bookCreation.getStatus();
        this.seller = bookCreation.getSeller();
        this.topics = bookCreation.getTopics();
        this.images = bookCreation.getImages();
        this.sold = false;
    }

    public void update(BookCreation bookCreation) {
        if (bookCreation.getIsbn() != null)
            this.isbn = bookCreation.getIsbn();
        if (bookCreation.getName() != null)
            this.name = bookCreation.getName();
        if (bookCreation.getAuthor() != null)
            this.author = bookCreation.getAuthor();
        if (bookCreation.getDescription() != null)
            this.description = bookCreation.getDescription();
        if (bookCreation.getPrice() != null)
            this.price = bookCreation.getPrice();
        if (bookCreation.getStatus() != null)
            this.status = bookCreation.getStatus();
        if (bookCreation.getSeller() != null)
            this.seller = bookCreation.getSeller();
        if (bookCreation.getImages() != null)
            this.images = bookCreation.getImages();

        this.sold = bookCreation.isSold();
    }

}
