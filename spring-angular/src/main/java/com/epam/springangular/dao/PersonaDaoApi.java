package com.epam.springangular.dao;

import com.epam.springangular.model.Person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaDaoApi extends JpaRepository<Person,Long>{

}
