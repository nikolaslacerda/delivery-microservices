package com.server.deliveryorderservice.repository;

import com.server.deliveryorderservice.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

import static com.server.deliveryorderservice.model.entity.Order.Status;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Order p set p.status = :status where p = :order")
    void updateStatus(@Param("status") Status status, @Param("order") Order order);

    @Query("select p from Order p where p.restaurantId = :restaurantId and p.status not in :statusList")
    List<Order> findByRestaurantWithoutStatus(@Param("restaurantId") Long restaurantId, @Param("statusList") List<Status> statusList);

    @Query(value = "SELECT p from Order p LEFT JOIN FETCH p.items where p.id = :id")
    Order findOrderItems(@Param("id") Long id);

}
