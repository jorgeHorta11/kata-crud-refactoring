package co.com.sofka.crud.controlador;

import co.com.sofka.crud.dominio.Todo;
import co.com.sofka.crud.servicios.TodoService;
import co.com.sofka.crud.servicios.converter.TodoConverter;
import co.com.sofka.crud.servicios.dto.TodoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;
    @Autowired
    private TodoConverter todoConverter;

    @GetMapping(value = "api/todos")
    public List<TodoDto> list(){
        List<Todo> All = (List<Todo>) service.list();
        return todoConverter.entityToDto(All);
    }
    @PostMapping(value = "api/todo")
    public TodoDto save(@RequestBody TodoDto todoDto){
        Todo todo = todoConverter.dtoToEntity(todoDto);
        todo = service.save(todo);
        return todoConverter.entityToDto(todo);
    }
    @PutMapping(value = "api/todo")
    public TodoDto update(@RequestBody TodoDto todoDto){

        if(todoDto.getId() != null){
            Todo todo = todoConverter.dtoToEntity(todoDto);
            todo = service.save(todo);
            return todoConverter.entityToDto(todo);
        }
        throw new RuntimeException("No existe el id para actualziar");
    }
    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public TodoDto get(@PathVariable("id") Long id){
        Todo todo = service.get(id);
        return todoConverter.entityToDto(todo);
    }

}
