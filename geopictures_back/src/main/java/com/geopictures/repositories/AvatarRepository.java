package com.geopictures.repositories;

import com.geopictures.models.entities.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvatarRepository  extends JpaRepository<Avatar, Long> {
    List<Avatar> findAllByFree(boolean free);
}
