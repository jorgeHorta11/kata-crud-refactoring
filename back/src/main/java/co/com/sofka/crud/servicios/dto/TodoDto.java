package co.com.sofka.crud.servicios.dto;

import javax.validation.constraints.NotEmpty;

public class TodoDto {
    @NotEmpty
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private boolean completed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
