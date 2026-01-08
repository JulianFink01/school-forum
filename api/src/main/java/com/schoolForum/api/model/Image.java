package com.schoolForum.api.model;

import javax.json.bind.annotation.JsonbTransient;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

import com.schoolForum.api.ressource.image.DTO.ImageDTO;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity(name = "image")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Transactional
public class Image extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    @Column(name = "path", length = 10485760)
    private String path;

    @NotNull
    @Column(name = "description")
    private String description;

    public Image(ImageDTO image){
        this.path=image.getPath();
        this.description=image.getDescription();
    }

}
