package com.server.deliverypaymentservice.job.processor;

import com.server.deliverypaymentservice.model.entity.Payment;
import com.server.deliverypaymentservice.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Slf4j
public class PaymentsProcessor implements Tasklet, StepExecutionListener {

    private List<Payment> payments;

    @Autowired
    private PaymentService paymentService;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        ExecutionContext executionContext = stepExecution
                .getJobExecution()
                .getExecutionContext();
        this.payments = (List<Payment>) executionContext.get("payments");
    }

    @Override
    public RepeatStatus execute(StepContribution stepContribution, ChunkContext chunkContext) throws Exception {
        this.payments.forEach(x -> paymentService.confirmPayment(x.getId()));
        return RepeatStatus.FINISHED;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        log.info("Payments processed!.");
        return ExitStatus.COMPLETED;
    }
}
