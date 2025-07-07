package br.com.uninter.apitaredas.controller;

import br.com.uninter.apitaredas.model.Tarefa;
import br.com.uninter.apitaredas.repository.TarefaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    private final TarefaRepository repository;

    public TarefaController(TarefaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Tarefa> criarTarefa(@RequestBody Tarefa tarefa) {
        Tarefa novaTarefa = repository.save(tarefa);
        return ResponseEntity.status(201).body(novaTarefa);
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> listarTodas() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarPorId(@PathVariable Long id) {
        Optional<Tarefa> tarefa = repository.findById(id);
        return tarefa.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizar(@PathVariable Long id, @RequestBody Tarefa novaTarefa) {
        return repository.findById(id).map(tarefa -> {
            tarefa.setNome(novaTarefa.getNome());
            tarefa.setDataEntrega(novaTarefa.getDataEntrega());
            tarefa.setResponsavel(novaTarefa.getResponsavel());
            repository.save(tarefa);
            return ResponseEntity.ok(tarefa);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        return repository.findById(id).map(tarefa -> {
            repository.delete(tarefa);
            return ResponseEntity.noContent().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
