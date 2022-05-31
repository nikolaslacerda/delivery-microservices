package com.server.deliverypaymentservice.job.reader;

import com.server.deliverypaymentservice.model.entity.Payment;
import com.server.deliverypaymentservice.model.enumeration.PaymentStatus;
import com.server.deliverypaymentservice.repository.PaymentRepository;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PaymentsReader implements Tasklet, StepExecutionListener {

    @Autowired
    private PaymentRepository paymentRepository;

    private List<Payment> payments;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        payments = new ArrayList<>();
    }

    @Override
    public RepeatStatus execute(StepContribution stepContribution, ChunkContext chunkContext) throws Exception {
        payments = paymentRepository.findAll()
                .stream()
                .filter(x -> x.getStatus().equals(PaymentStatus.CREATED))
                .collect(Collectors.toList());
        return RepeatStatus.FINISHED;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        stepExecution
                .getJobExecution()
                .getExecutionContext()
                .put("payments", this.payments);
        return ExitStatus.COMPLETED;
    }
}
