package co.com.sofka.crud.repositorio;

import co.com.sofka.crud.dominio.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
}
