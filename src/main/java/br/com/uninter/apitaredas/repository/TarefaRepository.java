package br.com.uninter.apitaredas.repository;

import br.com.uninter.apitaredas.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
