package com.epam.springangular.dao;

import java.util.Optional;

import com.epam.springangular.model.ImageModel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageModel, Long> {
	Optional<ImageModel> findByName(String name);
}
