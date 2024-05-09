package com.teamstatic.popkornback.controller;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.QnaDTO;
import com.teamstatic.popkornback.entity.Qna;
import com.teamstatic.popkornback.repository.QnaRepository;
import com.teamstatic.popkornback.service.QnaService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class QnaController {

    @Autowired
    private QnaService qnaService;

    @Autowired
    private QnaRepository qRepository;

    @GetMapping("/searchlist")
    public PageResultDTO<QnaDTO, Qna> searchlist(String searchType, String keyword, int page) {
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(10)
                .keyword(keyword)
                .build();

        switch (searchType) {
            case "Title":
                return qnaService.findAllByTitle(keyword, requestDTO);
            case "ID":
                return qnaService.findAllByID(keyword, requestDTO);
            case "Content":
                return qnaService.findAllByContent(keyword, requestDTO);
            default:
                return qnaService.findAll(requestDTO);
        }
    }

    @GetMapping("/posts")
    public PageResultDTO<QnaDTO, Qna> getPostsByCategory(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 10) Pageable pageable) {

        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(Math.max(0, pageable.getPageNumber()))
                .size(pageable.getPageSize())
                .build();

        if (category == null || category.equalsIgnoreCase("all")) {
            return qnaService.findAllPosts(requestDTO);
        } else {
            return qnaService.findPostsByCategory(category, requestDTO);
        }
    }

    @PatchMapping("/{sno}")
    public Qna updateQnaPost(@PathVariable("sno") int sno, @RequestBody Qna post) {
        try {
            Qna updatedPost = qnaService.updatePost(sno, post);
            if (updatedPost == null) {
                throw new Exception("Update failed");
            }
            return updatedPost;
        } catch (Exception e) {
            System.out.println("Error updating post: " + e.getMessage());
            return null;
        }
    }

    @DeleteMapping("/{sno}")
    public void deleteQnaPost(@PathVariable Integer sno) {
        try {
            qnaService.deletePost(sno);
        } catch (Exception e) {

        }
    }

    @PatchMapping("/reply/{sno}")
    public Qna updateQnaReply(@PathVariable("sno") int sno, @RequestBody Qna comment) {
        try {
            Qna updatedComment = qnaService.updateReply(sno, comment);
            if (updatedComment == null) {
                throw new Exception("Update failed");
            }
            System.out.println("수정된 댓글"+updatedComment);
            return updatedComment;
        } catch (Exception e) {
            System.out.println("Error updating comment: " + e.getMessage());
            return null;
        }
    }

    @PostMapping("/insert")
    public Qna createQna(@RequestBody Qna qna) {
        Date now = new Date();
        qna.setPostcreated(now);
        return qRepository.save(qna);
    }

    @GetMapping("/replies/{postId}")
    public List<Qna> getRepliesByPostId(@PathVariable int postId) {
        List<Qna> replies = qRepository.findByRoot(postId);
        return replies;
    }
    
     @PostMapping("/reply")
     public Qna addReply(@RequestBody Qna reply) {
        if (reply.getRoot() == null || reply.getContent() == null || reply.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required fields for reply");
        }
          
        Date now = new Date();
        reply.setCommentcreated(now);
        return qRepository.save(reply);
    }
    
    @GetMapping("/reply/count/{sno}")
    public long getCommentCount(@PathVariable int sno) {
        return qnaService.getCommentCountForPost(sno);
    }

}
