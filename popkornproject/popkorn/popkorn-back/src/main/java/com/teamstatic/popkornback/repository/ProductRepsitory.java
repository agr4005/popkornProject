package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Product;

public interface ProductRepsitory extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.categoryl = :categoryl AND p.categorym = :categorym AND p.pcode IN (SELECT MIN(p2.pcode) FROM Product p2 WHERE p2.categorym =:categorym GROUP BY p2.productname)")
    Page<Product> findByCategorylAndCategorym(String categoryl, String categorym, Pageable pageable);

    List<Product> findByProductname(String productname);

    @Query(value = "SELECT * FROM product WHERE pcode IN (SELECT MIN(pcode) FROM product WHERE categoryl = 'album' GROUP BY productname) ORDER BY receiptdate DESC", nativeQuery = true)
    Page<Product> findNewAlbum(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE pcode IN (SELECT MIN(pcode) FROM product WHERE categoryl = 'photo' GROUP BY productname) ORDER BY receiptdate DESC", nativeQuery = true)
    Page<Product> findNewPhoto(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE pcode IN (SELECT MIN(pcode) FROM product WHERE categoryl = 'goods' GROUP BY productname) ORDER BY receiptdate DESC", nativeQuery = true)
    Page<Product> findNewGoods(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.categoryl = :categoryl AND p.categorym = :categorym AND " +
            "(p.productname LIKE CONCAT('%', :keyword, '%') OR p.artist LIKE CONCAT('%', :keyword, '%') OR p.categorys LIKE CONCAT('%', :keyword, '%'))")
    Page<Product> findByCategoryLAndCategoryMAndKeyword(String categoryl, String categorym, String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.categoryl = :categoryl AND " +
            "(p.productname LIKE CONCAT('%', :keyword, '%') OR p.artist LIKE CONCAT('%', :keyword, '%') OR p.categorys LIKE CONCAT('%', :keyword, '%'))")
    Page<Product> findByCategoryLAndKeyword(String categoryl, String keyword, Pageable pageable);

    @Query("SELECT p " +
            "FROM Product p " +
            "WHERE p.artist = :artist " +
            "AND p.pcode IN (SELECT MIN(p2.pcode) " +
            "FROM Product p2 " +
            "WHERE p2.artist = :artist " +
            "GROUP BY p2.productname)")
    List<Product> findFirstProductByArtist(String artist);

    Product findByPcode(int pcode);

    @Query(value = "SELECT * FROM product p WHERE " +
            "p.categoryl LIKE %:keyword% OR " +
            "p.categorym LIKE %:keyword% OR " +
            "p.categorys LIKE %:keyword% OR " +
            "p.alternative LIKE %:keyword% OR " +
            "p.productname LIKE %:keyword% OR " +
            "p.artist LIKE %:keyword%", nativeQuery = true)
    Page<Product> findAllByKeywordLike(String keyword, Pageable pageable);

    long countByCategoryl(String categoryl);

    void deleteByPcode(int pcode);

}

