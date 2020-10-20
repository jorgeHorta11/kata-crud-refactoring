package co.com.sofka.crud.servicios.converter;

import co.com.sofka.crud.dominio.Todo;
import co.com.sofka.crud.servicios.dto.TodoDto;

import java.util.List;
import java.util.stream.Collectors;

public class TodoConverter {

    public TodoDto entityToDto(Todo todo){
        TodoDto todoDto = new TodoDto();
        todoDto.setId(todo.getId());
        todoDto.setName(todo.getName());
        todoDto.setCompleted(todo.isCompleted());
        return todoDto;
    }
    public List<TodoDto> entityToDto(List<Todo> todo){
        return todo.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
    }
    public Todo dtoToEntity(TodoDto todoDto){
        Todo todo = new Todo();
        todo.setId(todoDto.getId());
        todo.setName(todoDto.getName());
        todo.setCompleted(todoDto.isCompleted());
        return todo;
    }
    public List<Todo> dtoToEntity(List<TodoDto> todoDto){
        return todoDto.stream().map(x -> dtoToEntity(x)).collect(Collectors.toList());
    }
}
