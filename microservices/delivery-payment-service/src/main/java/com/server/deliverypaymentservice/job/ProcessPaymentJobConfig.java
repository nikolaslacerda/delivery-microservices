package com.server.deliverypaymentservice.job;

import com.server.deliverypaymentservice.job.processor.PaymentsProcessor;
import com.server.deliverypaymentservice.job.reader.PaymentsReader;
import org.springframework.batch.core.*;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.SimpleJobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;

@Configuration
@EnableBatchProcessing
public class ProcessPaymentJobConfig {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Autowired
    private SimpleJobLauncher jobLauncher;

    @Bean(name = "customJobLauncher")
    public SimpleJobLauncher jobLauncher(JobRepository jobRepository) {
        SimpleJobLauncher launcher = new SimpleJobLauncher();
        launcher.setJobRepository(jobRepository);
        return launcher;
    }
    
//    @Bean(name = "customJobRepository")
//    public JobRepository jobRepository() throws Exception {
//        JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
//        factory.setDataSource(dataSource());
//        factory.setTransactionManager(transactionManager());
//        return factory.getObject();
//    }
//
//    @Bean(name = "customDatasource")
//    public DataSource dataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName("org.h2.Driver");
//        dataSource.setUrl("jdbc:h2:mem:db;DB_CLOSE_DELAY=-1");
//        dataSource.setUsername("sa");
//        dataSource.setPassword("");
//        return dataSource;
//    }
//
//    @Bean(name = "customTransactionManager")
//    public PlatformTransactionManager transactionManager() {
//        return new ResourcelessTransactionManager();
//    }

    @Bean
    public PaymentsReader paymentsReader() {
        return new PaymentsReader();
    }

    @Bean
    public PaymentsProcessor paymentsProcessor() {
        return new PaymentsProcessor();
    }

    @Bean
    protected Step readPayments() {
        return stepBuilderFactory
                .get("readPayments")
                .tasklet(paymentsReader())
                .build();
    }

    @Bean
    protected Step processPayments() {
        return stepBuilderFactory
                .get("processPayments")
                .tasklet(paymentsProcessor())
                .build();
    }

    @Bean
    public Job processPaymentsJob() {
        return jobBuilderFactory
                .get("processPaymentsJob")
                .start(readPayments())
                .next(processPayments())
                .build();
    }

    @Scheduled(cron = "0 */1 * * * *")
    public void perform() throws Exception {
        System.out.println("Job Started at :" + new Date());
        JobParameters param = new JobParametersBuilder().addString("JobID", String.valueOf(System.currentTimeMillis()))
                .toJobParameters();
        JobExecution execution = jobLauncher.run(processPaymentsJob(), param);
        System.out.println("Job finished with status :" + execution.getStatus());
    }
}
