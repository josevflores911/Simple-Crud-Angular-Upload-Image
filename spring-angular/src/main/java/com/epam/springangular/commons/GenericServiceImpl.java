package com.epam.springangular.commons;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public abstract class GenericServiceImpl<T,Id extends Serializable> implements GenericServiceApi<T,Id>{

    @Override
    public T save(T entity) {
        // TODO Auto-generated method stub
        return getDao().save(entity);
    }

    @Override
    public void delete(Id id) {
        // TODO Auto-generated method stub
        getDao().deleteById(id);
    }

    @Override
    public T get(Id id) {
        // TODO Auto-generated method stub
        return getDao().findById(id).get();
    }

    @Override
    public List<T> getAll() {
        // TODO Auto-generated method stub
        return getDao().findAll();
    }
    
    public abstract JpaRepository<T,Id> getDao();
}
