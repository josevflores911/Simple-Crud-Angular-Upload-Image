package com.epam.springangular.controller;

import java.util.List;

import com.epam.springangular.model.Person;
import com.epam.springangular.service.PersonServiceApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1")
@CrossOrigin({"*"})
public class PersonRestController {
    
    @Autowired
    private PersonServiceApi personServiceApi;

    @GetMapping(value = "/all")
    public List<Person> getAll(){
        return personServiceApi.getAll();        
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Person> findById(@PathVariable Long id){
        return new ResponseEntity<Person>(personServiceApi.get(id),HttpStatus.OK);
    
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Person> save(@RequestBody Person person){
        return new ResponseEntity<Person>(personServiceApi.save(person),HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Person> delete(@PathVariable Long id){
        Person person= personServiceApi.get(id);
        if(person != null){
            personServiceApi.delete(id);
        }else{
            return new ResponseEntity<Person>(person,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Person>(person,HttpStatus.OK);
    }

}
