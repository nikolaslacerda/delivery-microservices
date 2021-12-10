package br.com.caelum.eats.restaurante;

import br.com.caelum.eats.administrativo.TipoDeCozinha;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
class RestauranteController {

    private RestauranteRepository restaurantRepository;
    private CardapioRepository cardapioRepo;
    private DistanciaRestClient distanciaRestClient;

    @GetMapping("/restaurants/{id}")
    public RestauranteDto getRestaurant(@PathVariable("id") Long id) {
        Restaurante restaurant = restaurantRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return new RestauranteDto(restaurant);
    }

    @GetMapping("/partners/restaurants/user/{username}")
    public RestauranteDto getByUser(@PathVariable("username") String username) {
        Restaurante restaurant = restaurantRepository.findByUsername(username);
        return new RestauranteDto(restaurant);
    }

    @GetMapping("/restaurants")
    public List<RestauranteDto> getRestaurants(@RequestParam("ids") List<Long> ids) {
        return restaurantRepository.findAllById(ids).stream().map(RestauranteDto::new).collect(Collectors.toList());
    }

    @GetMapping("/partners/restaurants/{id}")
    public RestauranteDto getPartner(@PathVariable("id") Long id) {
        Restaurante restaurant = restaurantRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return new RestauranteDto(restaurant);
    }

    @PostMapping("/partners/restaurants")
    public Restaurante create(@RequestBody Restaurante restaurante) {
        restaurante.setAprovado(false);
        Restaurante restauranteSalvo = restaurantRepository.save(restaurante);
        Cardapio cardapio = new Cardapio();
        cardapio.setRestaurante(restauranteSalvo);
        cardapioRepo.save(cardapio);
        return restauranteSalvo;
    }

    @Transactional
    @PutMapping("/partners/restaurants/{id}")
    public RestauranteDto update(@RequestBody RestauranteDto restaurante) {
        Restaurante doBD = restaurantRepository.getOne(restaurante.getId());
        TipoDeCozinha tipoDeCozinhaOriginal = doBD.getTipoDeCozinha();
        String cepOriginal = doBD.getCep();
        restaurante.populaRestaurante(doBD);
        Restaurante salvo = restaurantRepository.save(doBD);
        if (!tipoDeCozinhaOriginal.getId().equals(restaurante.getTipoDeCozinha().getId())
                ||
                !cepOriginal.equals(restaurante.getCep())) {
            distanciaRestClient.restauranteAtualizado(salvo);
        }
        return new RestauranteDto(salvo);
    }


    @GetMapping("/admin/restaurants/pending")
    public List<RestauranteDto> emAprovacao() {
        return restaurantRepository.findAllByAprovado(false).stream().map(RestauranteDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    @PatchMapping("/admin/restaurants/{id}")
    public void aprova(@PathVariable("id") Long id) {
        restaurantRepository.aprovaPorId(id);
        Restaurante restaurante = restaurantRepository.getOne(id);
        distanciaRestClient.novoRestauranteAprovado(restaurante);
    }
}
