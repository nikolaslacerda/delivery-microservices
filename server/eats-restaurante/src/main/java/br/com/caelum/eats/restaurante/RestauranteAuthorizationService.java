package br.com.caelum.eats.restaurante;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.com.caelum.eats.seguranca.Role;
import br.com.caelum.eats.seguranca.User;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RestauranteAuthorizationService {

	private RestauranteRepository restauranteRepo;

	public boolean checaId(Authentication authentication, long id) {
		User user = getUserFromAuthentication(authentication);
		if (user != null && user.isInRole(Role.ROLES.PARCEIRO)) {
			Restaurante restaurante = restauranteRepo.findByUserId(user.getId());
			if (restaurante != null) {
				return id == restaurante.getId();
			}
		}
		return false;
	}

	public boolean checaUserId(Authentication authentication, Long userId) {
		User user = getUserFromAuthentication(authentication);
		return user != null && user.isInRole(Role.ROLES.PARCEIRO) && user.getId().equals(userId);
	}

	private User getUserFromAuthentication(Authentication authentication) {
		Object principal = authentication.getPrincipal();
		if (principal instanceof User) {
			User user = (User) principal;
			return user;
		}
		return null;
	}


}
