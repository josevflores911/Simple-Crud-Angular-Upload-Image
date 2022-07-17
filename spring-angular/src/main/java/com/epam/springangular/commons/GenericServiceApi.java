package com.epam.springangular.commons;

import java.io.Serializable;
import java.util.List;

public interface GenericServiceApi <T, Id extends Serializable>{
    T save(T entity);

    void delete(Id id);

    T get(Id id);

    List<T> getAll();
}
