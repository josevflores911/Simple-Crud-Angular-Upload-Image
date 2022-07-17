package com.epam.springangular.service;

import com.epam.springangular.commons.GenericServiceImpl;
import com.epam.springangular.dao.PersonaDaoApi;
import com.epam.springangular.model.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl extends GenericServiceImpl<Person,Long> implements PersonServiceApi  {

    @Autowired
    private PersonaDaoApi personaDaoApi;

    @Override
    public JpaRepository<Person, Long> getDao() {
        // TODO Auto-generated method stub
        return personaDaoApi;
    }
    
}
